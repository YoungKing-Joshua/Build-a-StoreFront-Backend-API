import { PoolClient } from 'pg';
import client from '../database';

interface Order {
  id?: number;
  order_status: string;
  user_id: number;
}

interface OrdersProducts {
  id?: number;
  order_id: string;
  product_id: number;
  order_product_quantity: number;
}

class OrdersModel {
  async index(): Promise<Order[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not retrieve orders table: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not retrieve order of user id ${id}: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'INSERT INTO orders (order_status,user_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.order_status, o.user_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add order of user id ${o.user_id}: ${err}`);
    }
  }

  async edit(o: Order): Promise<Order> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'UPDATE orders SET user_id=($2), order_status=($3) WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [o.id, o.user_id, o.order_status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order id: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order id ${id}: ${err}`);
    }
  }

  async addProduct(
    order_id: string,
    product_id: number,
    order_product_quantity: number
  ): Promise<Order> {
    try {
      const sql: string =
        'INSERT INTO orders_products (order_id, product_id, order_product_quantity) VALUES($1, $2, $3) RETURNING *';
      const conn: PoolClient = await client.connect();
      const result = await conn.query(sql, [order_id, product_id, order_product_quantity]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add product to order ${err}`);
    }
  }

  async showOrdersProducts(): Promise<OrdersProducts[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = 'SELECT * FROM orders_products';
      const result = await conn.query(sql);
      const order = result.rows;
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not retrieve ordered products`)
    }
  }
}

export { Order, OrdersProducts, OrdersModel };
