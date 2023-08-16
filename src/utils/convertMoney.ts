
const convertMoney = (amount : number) => {
    return new Intl.NumberFormat('en-US', {
        style:'currency',
        currency:"USD"
    }).format(amount || 0)
}

export default convertMoney;