# crypto monitor

## Tools used
```
- GitKraken
- PHPStorm
- Postman
- https://uigradients.com/
- Pinterest (to get some idea's ...)
```

## Project setup
```
- vue create .

- vue add typescript

    Decided to use the class-style syntax as I really love it. It makes the code more readable.
    This syntax will remain usable in Vue v3 (next to the new composition-api :)).
    The class-style syntax compiles down to the native syntax anyway.

- added support for <style lang=scss>

- modular design

    - router (vue-router)
    
    One root instance, contains all modularized sub-routes
    
    - Store (vuex)
    
    One root instance, contains all modularized sub-stores

    - added vuex-class with the Getter/Action/... helper-decorators
    
- added (empty on creation) CSS reset (_reset.scss) under 'style' directory

- added modules/components directories

    Will contain the app's modules.
    Currently, only 'common' (common module) and 'crypto' (crypto module)

- visual layer is vuetify

    Had 2 choices in mind (vuetify and vue-bootstrap).
    Both are very similar (flexbox based) and use very silimar constructions.
    Decided to go with vuetify as:
    - I already used it
    - May be helpfull for you guys for comparison to vue-bootstrap
    However, vue-bootstrap's documentation is far better ;).

- Added axios REST HTTP

    - I switched to CoinAPI for fetching the crypto data as CoinMarketCap gave some issues.
    CoinMarketCap erased my login :(, had to re-register. Used the same login, that worked ... odd.
    Switched to CoinAPI, got the sanbox API working fast ...
    - The returned historical results data-points cannot exceed 10 in sandbox mode ...
        {
          "error": "In the sandbox environment you cant use limit higher than 10."
        }
    - Filtered out the currecies where there's no USD price available.

- UI Design

    - Decided to use 1 view combining the crypto list view and the crypto list history view.
    This way, all crypto's are shown in a list. The first one is auto selected.
    When the crypto is in the browser's URL, that crypto is selected.
    - On the right, a crypto list sorted on Daily Volume
    - On the left, there's the details (short-name/current price/trade count and volume) of the selected crypto 
    and a price history trend of the last 10 Minutes (10 data-points with 10 minutes in-between) => 90 minutes.
    - On 'small-screen' breakpoint, the coins list will be placed under the info/trend graph, so we have responsivenes on 
    small screens.

- vue add i18n (Internatinalization)

- Other things

    - Did not add support for dark/light theming. Figured that this is not really a lot of extra value.
    - Did not add SEO keywords/manifest files.
    - Did not provide units testing (Jest).
    - There's no live update - yet -
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
