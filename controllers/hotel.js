import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export async function  createHotel (req, res, next){
  const newHotel = new Hotel(req.body);
  try {
    const saved = await newHotel.save();
    res.status(200).send(saved);
  } catch (err) {
    next(err);
  }
};
export async function updateHotel(req, res, next){
  try {
    const updated = await Hotel.findByIdAndUpdate(req.params.id,{ $set: req.body },{ new: true });
    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
};
export async function  deleteHotel(req, res, next){
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");
  } catch (err) {
    next(err);
  }
};
export async function getHotel(req, res, next){
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).send(hotel);
  } catch (err) {
    next(err);
  }
};
export async function getHotels(req, res, next){
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({...others,cheapestPrice: { $gt: min | 1, $lt: max || 999 },
}).limit(req.query.limit);
    res.status(200).send(hotels);
  } catch (err) {
    next(err);
  }
};
export async function countByCity(req, res, next){
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {return Hotel.countDocuments({ city: city });
})
    );
    res.status(200).send(list);
  } catch (err) {
    next(err);
  }
};
export async function countByType(req, res, next){
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).send([
      { type: "hotel", count: hotelCount },
      { type: "villas", count: villaCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export async function getHotelRooms (req, res, next){
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {return Room.findById(room);
      })
    );
    res.status(200).send(list)
  } catch (err) {
    next(err);
  }
};
