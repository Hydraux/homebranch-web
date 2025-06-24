import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("books/:bookId", "routes/book.tsx"),
    route("books/:bookId/read", "routes/read-book.tsx"),
    route("create-book", "routes/create-book.tsx"),
    route("currently-reading", "routes/currently-reading.tsx"),
    route("favorites", "routes/favorites.tsx"),
    index("routes/library.tsx"),
    route("settings", "routes/settings.tsx"),
    route("statistics", "routes/statistics.tsx")
] satisfies RouteConfig;
