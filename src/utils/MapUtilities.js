import MAP_ROUTERS from "../router/MapRouters";

/**
 * Retrieves the first route object from the MAP_ROUTERS array that matches the specified path.
 *
 * @param {string} path - The path to search for in the MAP_ROUTERS array.
 * @returns {Object|undefined} - The first route object that matches the path, or `undefined` if no match is found.
 */
export const getRoutesByPath = path => MAP_ROUTERS.find(route => route?.path === path);



/**
 * Determines if a grouping role is required for the specified path.
 *
 * @param {string} path - The path to check in the MAP_ROUTERS array.
 * @returns {boolean} - `true` if the route requires a grouping role, otherwise `false`.
 */
export const isGroupingRoleRequired = path => {
    const routes = getRoutesByPath(path);
    return routes?.groupingRoleIsRequired || false;
}