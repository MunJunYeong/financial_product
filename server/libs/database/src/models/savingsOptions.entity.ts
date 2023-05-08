import { Model, DataType, Column, PrimaryKey, Table, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Savings } from "./savings.entity";

@Table
export class SavingsOption extends Model<SavingsOption> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    option_idx: number

    @Column
    fin_prdt_cd: string

    @Column
    intr_rate_type_nm: string

    @Column
    rsrv_type_nm: string

    @Column
    save_trm: string

    @Column
    intr_rate: number

    @Column
    intr_rate2: number

    @ForeignKey(() => Savings)
    @Column
    savingsIdx: number;

    @BelongsTo(() => Savings)
    savings: Savings;

}