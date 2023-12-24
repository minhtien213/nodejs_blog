module.exports = function checkCartItemCount(req){
    const cartItemCount = req.cookies.cartItemCount
    return cartItemCount !== undefined ? cartItemCount : 0
}