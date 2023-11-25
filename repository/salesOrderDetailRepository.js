class SalesOrderDetailRepository {
    async createOrderDetail(data) {
        return await this.prisma.SalesOrderDetail.create({
            data: data
        });
    }
}

module.exports = new SalesOrderDetailRepository();
