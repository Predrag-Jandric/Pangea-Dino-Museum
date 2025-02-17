import {fetchAllDinosaurs} from "./dinosaurs.service.js";

export const getAllDinosaurs = async (req, res) => {
  try {
    const dinosaurs = await fetchAllDinosaurs();
    res.json(dinosaurs);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch dinosaurs" });
  }
};


