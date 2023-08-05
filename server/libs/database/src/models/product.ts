import { Model, Column, PrimaryKey, Table, Unique, DataType, AutoIncrement, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';
import { SavingsOption } from './savingsOptions.entity';
import { User } from './user';

@Table
export class Product extends Model<Product> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    product_idx: number;

    @Column
    name: string;

    @Column
    start_date: string;

    @Column
    finish_date: string;

    @Column
    period: string;

    @Column
    rate: string;

    @Column
    monthly_payment: string;

    // 총 이자
    @Column
    total_interest: string;

    @Column
    is_simple: boolean;
    
    @ForeignKey(()=> User)
    @Column
    user_idx: number;
    
    @BelongsTo(()=> User)
    user: User;
}