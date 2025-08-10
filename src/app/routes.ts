import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [
    layout("routes/dashboard/layout.tsx", [
        route("books/:bookId", "routes/dashboard/book.tsx"),
        route("books/:bookId/read", "routes/dashboard/read-book.tsx"),
        route("create-book", "routes/dashboard/create-book.tsx"),
        route("delete-book/:id", "routes/dashboard/delete-book.tsx"),
        route("currently-reading", "routes/dashboard/currently-reading.tsx"),
        route("favorites", "routes/dashboard/favorites.tsx"),
        index("routes/dashboard/library.tsx"),
        route("settings", "routes/dashboard/settings.tsx"),
        route("statistics", "routes/dashboard/statistics.tsx")
    ]),
    route("login", "routes/login.tsx"),
    route("sign-up", "routes/sign-up.tsx"),

] satisfies RouteConfig;
