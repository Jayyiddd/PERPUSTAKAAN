import Anggota from "../models/anggotaModel.js";
import Peminjaman from "../models/peminjamanModel.js";
import Pengembalian from "../models/pengembalianModel.js";

export const getPeminjaman = async (req, res) => {
  try {
    const response = await Peminjaman.findAll({

    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// NEW
export const getPeminjamanById = async (req, res) => {
  try {
    const response = await Peminjaman.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!response)
      return res.status(401).json({ msg: "Peminjaman tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePeminjaman = async (req, res) => {
  const { tanggal_pinjam, tanggal_kembali, anggota_id, petugas_id } = req.body;
  try {
    const resss = await Peminjaman.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!resss)
      return res.status(404).json({ msg: "Peminjaman tidak ditemukan" });
    const response = await Peminjaman.update(
      {
        tanggal_pinjam,
        tanggal_kembali,
        anggota_id,
        petugas_id,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Peminjaman berhasil diupdate", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePeminjaman = async (req, res) => {
  const { tanggal_pinjam, tanggal_kembali, anggota_id, petugas_id } =
    req.params;
  try {
    const resss = await Peminjaman.findOne({
      attributes: {
        tanggal_pinjam,
        tanggal_kembali,
        anggota_id,
        petugas_id,
      },
      where: {
        uuid: req.params.id,
      },
    });
    if (!resss)
      return res.status(404).json({ msg: "Peminjaman tidak ditemukan" });
    await Peminjaman.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Peminjaman berhasil dihapus", resss });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPeminjaman = async (req, res) => {
  const { tanggal_pinjam, tanggal_kembali, anggota_id, petugas_id } = req.body;
  try {
    await Peminjaman.create({
      tanggal_pinjam: tanggal_pinjam,
      tanggal_kembali: tanggal_kembali,
      anggota_id: anggota_id,
      petugas_id: petugas_id,
    });
    res.status(201).json({ msg: "Peminjaman Berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
