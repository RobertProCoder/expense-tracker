export function currencyFormatter(props){

    const formatter = new Intl.NumberFormat('en-PH',{
        style:'currency',
        currency:'PHP',
    })

    const formattedCurrency = formatter.format(props)
    return formattedCurrency;
}