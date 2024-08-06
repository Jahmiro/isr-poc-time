# isr poc time

## Installatie

Volg deze stappen om je project lokaal te installeren en draaien:

1. Clone de repository:
    ```bash
    git clone https://github.com/Jahmiro/isr-poc-time
    ```
2. Navigeer naar de projectmap:
    ```bash
    cd isr-poc-time
    ```
3. Installeer de benodigde dependencies:
    ```bash
    npm install
    ```
    of
    ```bash
    yarn install
    ```

## On-Demand Revalidation Testen

Om on-demand revalidation te testen:

1. Maak een nieuwe blogpost aan via (https://isr-poc-time.vercel.app).

2. Verstuur een POST-verzoek naar de revalidation API-endpoint om de cache te verversen. Dit kan worden gedaan met Postman of door de URL in je adresbalk te plakken:
    ```
    https://isr-poc-time.vercel.app/api/revalidate?path=/blogs&secret=TestToken
    ```

   Dit verzoek zal de pagina met het pad `/blogs` opnieuw genereren. Refresh de pagina om de nieuwe blog te zien.
