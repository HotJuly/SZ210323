function filterAsyncRoutes(asyncRoutes,routesName){
    const newRoutes = asyncRoutes.filter((routeObj)=>{
        if(routesName.includes(routeObj.name)){

            if(routeObj.children&&routeObj.children.length){
                routeObj.children = filterAsyncRoutes(routeObj.children,routesName)
            }
            return true;
        }
    })
    return newRoutes;
}

export default filterAsyncRoutes;