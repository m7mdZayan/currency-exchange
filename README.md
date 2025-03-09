it's a simple app that enables users to get currency exchange rates,filter, sort, and convert values.

you can fine a live demo [`here`](https://currency-exchange-mzayan.vercel.app/)

## Getting Started

First, to run the app locally:

create an env file and add this varaible to it

```md
NEXT_PUBLIC_API_URL = "https://api.exchangerate-api.com/v4/latest/USD"
```

to run the development server locally:

```bash
npm run dev
```

and Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# main features of the app

![](https://raw.githubusercontent.com/m7mdZayan/currency-exchange/refs/heads/main/assets/screenshots/appFeatures.png)

## Currency Coversion

- you can convert any amount of USDs to set of currencies using a dropdown
- you select the currency you want and once enetering any value in USD it will be reflected

## Currency Exchange Rates Table

- you can find all the change rates for the global currencies
- sort them with its key or its price
- also you can search on a specific currency.
- the table was too long so i added a pagination.

## how it works

- we don't use socket here so the data is not updated on every change.
- we use Polling mechanism to get data like [Xe website](https://www.xe.com/currencyconverter/) (we update the data every minute)
- we store this time in a variable in data file so its so maintainable and we can change it anytime.

### Error handling

if there is an error in getting the initail data request.
we will show this error page.

![errorPage](https://github.com/m7mdZayan/currency-exchange/blob/main/assets/screenshots/errorPage.png?raw=true)

if the initail data request succeded and the second one (update of the data) failed.
we will show a snackbar to tell the user that the data is not updated but the app will work fine and won't stop.

![errorSnackbar](https://github.com/m7mdZayan/currency-exchange/blob/main/assets/screenshots/errorSnackbar.png?raw=true)

## extra

- the app has dark & light mode you can toggle it from the top right icon.

## Extending this dashboard (bonus)

1- we can add functions to the utils/api.ts file to get the crypto & stock exchange rates
2- if we didn't use MUI so we could make a shared table component to be used to show different types of data.
3- but as it's already a shared component we don't need it.
4- but we can make filter & sorting functions sharable to use them there also.
