function createUser(name, email, role = "viewer", createdAt = Date.now()) {
    if (!name) {
        throw new Error("Error: name field is empty");

        return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regex.test(email)) {
        throw new Error("Error:Invalid Email address");

        return;
    }
    let uuid = crypto.randomUUID();
    let user = {
        uuid,
        name,
        email,
        role,
        createdAt,
    };
    Object.freeze(user);

    return user;
}

let user = createUser("hawas", "hawas@gmail.com");
console.log(user);
user.name = "sasi";
console.log(user);

class QueryBuilder {
    constructor() {
        this.query = {
            select: ["*"],
            from: "",
            where: [],
            limit: null,
        };
    }

    select(column) {
        this.query.select = Array.isArray(column) ? column : [column];

        return this;
    }

    from(table) {
        this.query.from = table;

        return this;
    }

    where(condition) {
        this.query.where.push(condition);

        return this;
    }

    limit(count) {
        this.query.limit = count;

        return this;
    }

    build() {
        let sqlQuery = `SELECT ${this.query.select.join(",")} FROM ${this.query.from} `;
        if (this.query.where.length !== 0) {
            console.log(this.query.where);
            sqlQuery += `WHERE ${this.query.where.join(" AND ")} `;
        }
        if (this.query.limit !== null) {
            sqlQuery += `LIMIT ${this.query.limit}`;
        }

        return sqlQuery;
    }
}
const query = new QueryBuilder()
    .select(["username", "email"])
    .from("users")
    .where("name = 'hawas'")
    .where("id = 10")
    .limit(1)
    .build();

console.log(query);

function createNotification(type, message, duration = 7, dismissible = false) {
    let notification = {
        type,
        message,
        duration,
        dismissible,
    };

    return {
        notification,
        show() {
            console.log(notification);
        },
    };
}

const notification1 = createNotification("push", "this is a notification");
notification1.show();
console.log(notification1.notification);
