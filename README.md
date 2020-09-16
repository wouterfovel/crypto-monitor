# test-app

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

- Other things

    - Did not add support for dark/light theming. Figured that this is not really a lot of extra value.
    - Did not add SEO keywords/manifest files.
    - Did not provide units testing (Jest).

- Development Process

    - As it was a small project, I did not use a backlog/versioning system, like Jira.
    I just named the branches HUSLEIE-XXXXX.
    For larger projects, I would create epics/stories upfront (HUSLEIE-XXXXX), these are to be analyzed and estimated
    (e.g. fibonacci 1-2-3-5-8[-13]).
    The higher the story is positioned in the backlog, the more detailed the analysis should be, so it can be put on 
    the next sprint.
    I also like to use Pull/Merge Requests, so each feature branch is code reviewed and tested by at least one other person
    before it is pushed to development.
    I did not go all the way because it was not really applicable for this context.
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Internationalization ###

- vue add i18n
