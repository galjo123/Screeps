
const Do_For = require("Do_For_All");

const managment = {

	start_of_tick(){
/////////MEMORY_DELETION/////////////////////////////
		for(let name in Memory.creeps){
			if(!Game.creeps[name]){
				delete(Memory.creeps[name]);
			}
		}
/////////ROOM_INFO_UPDATE/////////////////////////////
		Do_For.All("rooms", room => {
			const room_info = require("room_info");
			const Targets = require("Targets");
			
			room.memory.roomInfo = new room_info(room);
//////////FOR_DETECTING_CHANGES_IN_ROOM////////////
			room.memory.Counter++;
			if(room.memory.Counter == 1){
				room.memory.Current_Construction_Sites = Targets.Construction_Sites(room);
				room.memory.Current_Damaged_Structures = Targets.Damaged_Structures(room);
			}
			if(room.memory.Counter >= 2){
				room.memory.Preavious_Construction_Sites = Targets.Construction_Sites(room);
				room.memory.Preavious_Damaged_Structures = Targets.Damaged_Structures(room);
				room.memory.Counter = 0;
			}
		});
	},

	structure_orders(){
		Do_For.All("rooms", room =>{
			const Targets = require("Targets");

			for(let id in Targets.Towers(room)){
				const tower = Targets.Towers(room)[id];

				if(Targets.Enemy_Creeps(room).length){
					const enemy_creep = tower.pos.findClosestByRange(Targets.Enemy_Creeps(room));
					tower.attack(enemy_creep);
				} else if(Targets.Damaged_Creeps(room).length){
					const damaged_creep = tower.pos.findClosestByRange(Targets.Damaged_Creeps(room));
					tower.heal(damaged_creep);
				} else if(Targets.Damaged_Structures(room).length && tower.energy > 0.5 * tower.energyCapacity){
					const damaged_structure = tower.pos.findClosestByRange(Targets.Damaged_Structures(room));
					tower.repair(damaged_structure);
				} else if(Targets.Damaged_Walls(room).length && tower.energy > 0.5 * tower.energyCapacity){
					const damaged_wall = tower.pos.findClosestByRange(Targets.Damaged_Walls(room));
					tower.repair(damaged_wall);
				}
			}
			const amountToSell = 2000, maxTransferEnergyCost = 500;
			const orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_HYDROGEN});

			for(let i=0; i<orders.length; i++) {
			    const transferEnergyCost = Game.market.calcTransactionCost(
			        amountToSell, 'E23N25', orders[i].roomName);

			    if(transferEnergyCost < maxTransferEnergyCost) {
			        Game.market.deal(orders[i].id, amountToSell, "E23N25");
			        break;
			    }
			}
		});
	},
/////////CREEP_SPAWNING//////////////////////////////
	creep_spawning(){
		const Make = require("Creep_Spawner");
		const Targets = require("Targets");
		
		Do_For.All("spawns", spawn => {
			const harvester_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "harvester").length;
			const worker_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "upgrader" || creep.memory.role == "builder" || creep.memory.role == "repairer").length;
			const miner_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "miner").length;

			const harvesting_spots = spawn.room.memory.roomInfo.E_harvesting_spots;
			let available_spots = 0;

			spawn.room.find(FIND_SOURCES).forEach(source => {
				const per_source_available_spots = spawn.room.memory.roomInfo.spots_per_source[source.id];
				
				if(spawn.room.energyCapacityAvailable < 450 && per_source_available_spots > 4){
					avaialble_spots += 5;
				} else if(spawn.room.energyCapacityAvailable < 600 && spawn.room.energyCapacityAvailable >= 450 && per_source_available_spots > 4){
					available_spots += 4;
				} else if(spawn.room.energyCapacityAvailable < 900 && spawn.room.energyCapacityAvailable >= 600 && per_source_available_spots > 3){
					available_spots += 3;
				} else if(spawn.room.energyCapacityAvailable < 1800 && spawn.room.energyCapacityAvailable >= 900 && per_source_available_spots > 2){
					available_spots += 2;
				} else {
					available_spots += 1;
				}
			});

			if(!Targets.Containers(spawn.room, "spawn").length){
				available_spots = spawn.room.memory.roomInfo.sources.length;
			}

			if(!spawn.spawning && harvester_number < available_spots){
				Make.Harvester(spawn);
			} else if(!spawn.spawning && worker_number < 2){
				Make.Worker(spawn);
			} else if(miner_number < 1){
				Make.Miner(spawn);
			}
			/*function will require a function telling it how many creeps it can spawn max*/
		});
	},
/////////CREEP_ORDERS//////////////////////////////
	creep_action(){
		Do_For.All("creeps", creep => {
			const Worker_State_Machine = require ("Worker_State_Machine");
			const Roles = require("Assign_Roles");
			const Targets = require("Targets");
			
///////////////FOR_FINDING_A_CHANGE_IN_THE_NUMBER_OF_CONSTRUCTION_SITES/////////////////////////////////////////
			if(creep.memory.role == "upgrader" || creep.memory.role == "builder" || creep.memory.role == "repairer"){
				let condition;
				
				if(((creep.room.memory.Current_Construction_Sites.length - creep.room.memory.Preavious_Construction_Sites.length) != 0 &&
					(creep.room.memory.Preavious_Construction_Sites.length == 0 || creep.room.memory.Current_Construction_Sites.length == 0)) ||
					((creep.room.memory.Current_Damaged_Structures.length - creep.room.memory.Preavious_Damaged_Structures.length) != 0 &&
					(creep.room.memory.Preavious_Damaged_Structures.length == 0 || creep.room.memory.Current_Damaged_Structures.length == 0))) {
					condition = true;
				}
				
				if(condition){
					Roles.Assign(creep);
				}
			}
			Worker_State_Machine.run(creep);
		});
	},


	Run_Each_Tick() {
		
		managment.start_of_tick();
		managment.structure_orders();
		managment.creep_spawning();
		managment.creep_action();
	}
};

module.exports = managment;