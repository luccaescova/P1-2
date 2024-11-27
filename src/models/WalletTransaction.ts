import { runSQL } from "../utils/runSQL";

const createWalletTransactionTable = async () => {
    const sql = `
        CREATE TABLE WalletTransactions (
            id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
            user_id NUMBER NOT NULL,
            amount NUMBER(10, 2) NOT NULL,
            type VARCHAR2(20) NOT NULL CHECK (type IN ('deposit', 'withdraw')),
            details VARCHAR2(255),
            timestamp DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
        )
    `;

    await runSQL(sql);
};

createWalletTransactionTable();
export ;k