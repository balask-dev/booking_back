import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
 
export async function createRoom (req, res, next){
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: savedRoom._id },
});
    } catch (err) {
      next(err);
    }
    res.status(200).send(savedRoom);
  } catch (err) {
    next(err);
  }
};

export async function updateRoom  (req, res, next){
  try {
    const updated = await Room.findByIdAndUpdate(req.params.id,{ $set: req.body },{ new: true } );
    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
};

export async function updateRoomAvailability (req, res, next){
  try {
    await Room.updateOne({ "roomNumbers._id": req.params.id },{$push: {
          "roomNumbers.$.unavailableDates": req.body.dates},
      }
    );
    res.status(200).send("Room status updated.");
  } catch (err) {
    next(err);
  }
};

export async function deleteRoom (req, res, next){
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {$pull: { rooms: req.params.id }});
    } catch (err) {
      next(err);
    }
    res.status(200).send("Room Deleted");
  } catch (err) {
    next(err);
  }
};

export async function getRoom (req, res, next){
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).send(room);
  } catch (err) {
    next(err);
  }
};

export async function getRooms (req, res, next){
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (err) {
    next(err);
  }
};
