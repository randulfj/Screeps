const CONST = require('CONSTANTS');

var cache = new Map();


module.exports = {

  findCached: function(whatToFind, room)
  {
    var key = whatToFind+ " " + room.name;
    if(cache.has(key))
    {
      return cache.get(key);
    }

    switch(whatToFind)
    {
      case CONST.CACHEFIND_MYTOWERS:
        var a = room.find(FIND_MY_STRUCTURES, {
              filter: (structure) =>
              {
                  return (structure.structureType == STRUCTURE_TOWER);
              }
          });
        cache.set(key, a);
        break;
      case CONST.CACHEFIND_SOURCES:
        /*var s = [];
        for(var room_name in Game.rooms)
        {
            s= s.concat(Game.rooms[room_name].find(FIND_SOURCES));
        }*/
        s = room.find(FIND_SOURCES);
        cache.set(key, s);
        break;
      case CONST.CACHEFIND_DROPPEDENERGY:
        var d = [];
        /*
        for(var room_name in Game.rooms) {
            d= d.concat(Game.rooms[room_name].find(FIND_DROPPED_RESOURCES));
        }*/
        var d = (room.find(FIND_DROPPED_RESOURCES, {
            filter: (resource) =>
            {
                return (resource.resourceType == RESOURCE_ENERGY);
            }
        }));
        cache.set(key, d);
        break;
      case CONST.CACHEFIND_CONTAINERSTOFILL:
        var a = (room.find(FIND_STRUCTURES, {
            filter: (structure) =>
            {
                return ( structure.structureType == STRUCTURE_CONTAINER || structure.structureType ==  STRUCTURE_STORAGE) && (_.sum(structure.store) < structure.storeCapacity);
            }
        }));

        cache.set(key, a);
        break;
      case CONST.CACHEFIND_CONSTRUCTIONSITES:
        cache.set(key, room.find(FIND_CONSTRUCTION_SITES));
        break;
      case CONST.CACHEFIND_STRUCTURESTOFILL:

        var a = (room.find(FIND_MY_STRUCTURES, {
            filter: (structure) =>
            {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && (structure.energy < structure.energyCapacity);
            }
        }));

        cache.set(key, a);
        break;
      case CONST.CACHEFIND_TOWERSTOFILL:
        var a = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) =>
                {
                    return (structure.structureType == STRUCTURE_TOWER) && (structure.energy < 0.6*structure.energyCapacity);
                }
            });
        cache.set(key, a);
        break;
      case CONST.CACHEFIND_CONTAINERSWITHENERGY:
        var a = room.find(FIND_STRUCTURES, {
                  filter: (structure) =>
                  {
                      return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType ==  STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY]>= 50;
                  }
              });
        cache.set(key,a);
        break;
      case CONST.CACHEFIND_STRUCTURESWITHENERGY:
        var a = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) =>
                {
                    return ((structure.structureType == STRUCTURE_EXTENSION) || (structure.structureType == STRUCTURE_SPAWN)) && structure.energy>= 50;
                }
            });
        cache.set(key,a);
        break;
      case CONST.CACHEFIND_SPAWNS:
        var a = room.find(FIND_MY_STRUCTURES, {
              filter: (structure) =>
              {
                  return (structure.structureType == STRUCTURE_SPAWN)
              }
          });
        cache.set(key, a);
        break;
      default:
        console.log("TRYING TO FIND SOMETHING UNSUPPROTED");
        return;
    }
    return cache.get(key);


  },
  cacheFindClear: function()
  {
    cache = new Map();
  }




  };
