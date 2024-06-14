import PeminjamanDetail from "../models/peminjamanDetail.js";
import Peminjaman from "../models/peminjamanModel.js";

export const getPeminjamanDetail = async (req, res) => {
  try {
    const response = await PeminjamanDetail.findAll({
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// NEW
export const getPeminjamanDetailById = async (req, res) => {
  try {
    const response = await PeminjamanDetail.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!response)
      return res.status(401).json({ msg: "Peminjaman detail tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePeminjamanDetail = async (req, res) => {
  const { peminjaman_id, buku_id } = req.body;
  try {
    const resss = await PeminjamanDetail.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!resss)
      return res.status(404).json({ msg: "Peminjaman tidak ditemukan" });
    const response = await PeminjamanDetail.update(
      {
        peminjaman_id,
        buku_id,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res
      .status(200)
      .json({ msg: "Peminjaman Detail berhasil diupdate", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePeminjamanDetail = async (req, res) => {
  const { peminjaman_id, buku_id } = req.params;
  try {
    const resss = await PeminjamanDetail.findOne({
      attributes: {
        peminjaman_id,
        buku_id,
      },
      where: {
        uuid: req.params.id,
      },
    });
    if (!resss)
      return res.status(404).json({ msg: "Peminjaman tidak ditemukan" });
    await PeminjamanDetail.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Peminjaman berhasil dihapus", resss });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// NEW

export const createPeminjamanDetail = async (req, res) => {
  const { peminjaman_id, buku_id } = req.body;
  try {
    await PeminjamanDetail.create({
      peminjaman_id: peminjaman_id,
      buku_id: buku_id,
    });
    res.status(201).json({ msg: "Pembuatan Peminjaman Detail Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
