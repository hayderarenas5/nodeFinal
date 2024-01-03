import { Order } from "./orders.model.js";

export class OrderService {
    static async createOrder(data){
        return await Order.create(data)
    }

    static async findAllOrder() {
        return Order.findAll({
            where: {
                status: 'active'
            }
        })
    }

    static async findOne(id){
        return await Order.findOne({ 
          where: {
            id: id,
          }
        })
    }

    static async update(order, data){
        return await order.update(data)
    }

    static async delete(order){
        return await order.update({ status: 'cancelled'})
    }
}