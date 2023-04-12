import client from '../database'

interface Product {
  id?: number
  product_name: string
  product_price: number
}

class ProductsModel {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not retrieve products: ${err}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not retrieve product with id ${id}: ${err}`)
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO products (product_name,product_price) VALUES($1, $2) RETURNING *'
      const result = await conn.query(sql, [p.product_name, p.product_price])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not add product ${p.product_name}: ${err}`)
    }
  }

  async edit(p: Product): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql =
        'UPDATE products SET product_name=($2), product_price=($3) WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [p.id, p.product_name, p.product_price])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update product id ${p.id}: ${err}`)
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not delete product id ${id}: ${err}`)
    }
  }
}

export { Product, ProductsModel };