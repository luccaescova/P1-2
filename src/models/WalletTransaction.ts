import { User } from "./User";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm";

@Entity()
export class WalletTransaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;

    @Column({ type: "enum", enum: ["deposit", "withdraw"] })
    type: "deposit" | "withdraw";

    @Column({ type: "text" })
    details: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    timestamp: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: number;
}

// export { WalletTransaction };
