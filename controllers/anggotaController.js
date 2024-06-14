import Anggota from "../models/anggotaModel.js";
import PeminjamanDetail from "../models/peminjamanDetail.js";
import Peminjaman from "../models/peminjamanModel.js";

export const getAnggota = async (req, res) => {
  try {
    const response = await Anggota.findAll({
      include: {
        model: Peminjaman,
        include: {
          model: PeminjamanDetail
        }
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAnggotaById = async (req, res) => {
  try {
    const response = await Anggota.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!response)
      return res.status(401).json({ msg: "Anggota tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateAnggota = async (req, res) => {
  const { nama, jenis_kelamin, alamat, telp } = req.body;
  try {
    const resss = await Anggota.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!resss)
      return res.status(404).json({ msg: "Data Anggota tidak ditemukan" });
    const response = await Anggota.update(
      {
        nama,
        jenis_kelamin,
        alamat,
        telp,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Data berhasil diupdate", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAnggota = async (req, res) => {
  const { nama, jenis_kelamin, alamat, telp } = req.params;
  try {
    const resss = await Anggota.findOne({
      attributes: {
        nama,
        jenis_kelamin,
        alamat,
        telp,
      },
      where: {
        uuid: req.params.id,
      },
    });
    if (!resss)
      return res.status(404).json({ msg: "Data Anggota tidak ditemukan" });
    await Anggota.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data berhasil dihapus", resss });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createAnggota = async (req, res) => {
  const { nama, jenis_kelamin, alamat, telp } = req.body;
  try {
    const response = await Anggota.create({
      nama: nama,
      jenis_kelamin: jenis_kelamin,
      alamat: alamat,
      telp: telp,
    });
    res.status(201).json({ msg: "Pembuatan Anggota Berhasil", response });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
