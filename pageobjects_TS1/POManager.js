import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { CartPage } from "./CartPage";
export class POManager {
    page;
    loginPage;
    dashboardPage;
    ordersHistoryPage;
    ordersReviewPage;
    cartPage;
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }
    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
}
