import Buku from "../models/bukuModel.js";
import Pengarang from "../models/pengarangModel.js";

export const getBuku = async (req, res) => {
  try {
    const response = await Buku.findAll({

    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// NEW

export const getBukuById = async (req, res) => {
  try {
    const response = await Buku.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!response) return res.status(401).json({ msg: "Buku tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateBuku = async (req, res) => {
  const {
    judul,
    buku_id,
    tahun_terbit,
    jumlah,
    isbn,
    pengarang_id,
    penerbit_id,
    kode_rak,
  } = req.body;
  try {
    const resss = await Buku.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!resss) return res.status(404).json({ msg: "Buku tidak ditemukan" });
    const response = await Buku.update(
      {
        judul,
        buku_id,
        tahun_terbit,
        jumlah,
        isbn,
        pengarang_id,
        penerbit_id,
        kode_rak,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Buku berhasil update", response });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteBuku = async (req, res) => {
  const {
    judul,
    buku_id,
    tahun_terbit,
    jumlah,
    isbn,
    pengarang_id,
    penerbit_id,
    kode_rak,
  } = req.params;
  try {
    const resss = await Buku.findOne({
      attributes: {
        judul,
        buku_id,
        tahun_terbit,
        jumlah,
        isbn,
        pengarang_id,
        penerbit_id,
        kode_rak,
      },
      where: {
        uuid: req.params.id,
      },
    });
    if (!resss) return res.status(404).json({ msg: "Buku tidak ditemukan" });
    await Buku.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data berhasil dihapus", resss });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBuku = async (req, res) => {
  const {
    judul,
    buku_id,
    tahun_terbit,
    jumlah,
    isbn,
    pengarang_id,
    penerbit_id,
    kode_rak,
  } = req.body;
  try {
    await Buku.create({
      judul: judul,
      buku_id: buku_id,
      tahun_terbit: tahun_terbit,
      jumlah: jumlah,
      isbn: isbn,
      pengarang_id: pengarang_id,
      penerbit_id: penerbit_id,
      kode_rak: kode_rak,
    });
    res.status(201).json({ msg: "Input Buku Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
