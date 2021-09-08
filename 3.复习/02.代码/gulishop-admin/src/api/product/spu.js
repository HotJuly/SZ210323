import request from '../../utils/request';
export default {
    // SPUInfo和SPUList(该数组内部存储多个SPU数据,但是很简略)
    // POST /admin/product/saveSpuInfo
    // POST /admin/product/updateSpuInfo
    // 新增和修改具体某一个SPU的数据
    addOrUpdate(spuInfo){
        return request.post(`/admin/product/${spuInfo.id?'update':'save'}SpuInfo`,spuInfo)
    },

    // DELETE /admin/product/deleteSpu/{spuId}
    // 通过SPU的Id删除对应的SPU
    deleteSpu(spuId){
        return request.delete(`/admin/product/deleteSpu/${spuId}`)
    },

    // GET /admin/product/getSpuById/{spuId}
    // 通过SPU的Id获取对应的SPU的详细数据
    getSpuInfo(spuId){
        return request.get(`/admin/product/getSpuById/${spuId}`)
    },

    // GET /admin/product/{page}/{limit}
    // 通过页数,条数,以及三级分类ID请求对应的SPU列表数据
    getSpuList(page,limit,category3Id){
        return request.get(`/admin/product/${page}/${limit}`,{
            params:{
                category3Id
            }
        })
    },

    // GET /admin/product/baseSaleAttrList
    // 获取所有的销售属性
    getBaseSaleAttrList(){
        return request.get(`/admin/product/baseSaleAttrList`)
    },
}