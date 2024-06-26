import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Petugas from "./petugasModel.js";
import Anggota from "./anggotaModel.js";
import Peminjaman from "./peminjamanModel.js";

const { DataTypes } = Sequelize;

const Pengembalian = db.define(
  "pengembalian",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    tanggal_pengembalian: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },

    denda: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },

    peminjaman_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    anggota_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    petugas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Peminjaman.hasOne(Pengembalian, {
  foreignKey: "peminjaman_id",
});

Petugas.hasOne(Pengembalian, {
  foreignKey: "petugas_id",
});

Anggota.hasOne(Pengembalian, {
  foreignKey: "anggota_id",
});

export default Pengembalian;
