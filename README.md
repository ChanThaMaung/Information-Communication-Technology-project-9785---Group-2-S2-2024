![image](https://github.com/user-attachments/assets/73e405ba-ff9b-42eb-a8c1-09e5b53bb38c)

![image](https://github.com/user-attachments/assets/b0dfc58b-90e5-401f-99d1-1da9b5d32aa9)# Information-Communication-Technology-project-9785---Group-2-S2-2024 - Project changelogs

## Changes to be made: 
+ Changes to the dataflow:
  - Emitters now do not need verification from verifiers (done).
  - Emitters now can only buy from verified issuer transactions (done). 
  - Verifiers now only verify issuer transactions (done).
+ Error-handling:
  - Showing error pop-ups when a user writes an incorrect/duplicate input (in progress).
  - Allowing users to connect to metamask on their smartphone devices or a workaround for that idea (for the project demo purpose).
  - Changing the blockchain network from Ganache to Sepolia to allow everyone to work with smart contracts (to be implemented).
Changes to consider: 
- I want to make the user experience with smart contracts more convenient. 
  Currently, I'm considering changing the data flow of Emitter and Verifier. At the moment, both an emitter and a verifier need to sign two contracts in order add the transactions to the blockchain. This causes a major problem: 
-  If a verifier/emitter signs the first transaction but then accidentally rejects the second transaction, only the transaction for the first contract is stored on the blockchain.

### Update to Changelog 2.2: added country as a filter box and data display. 
## Changelog 2.2: 

Mainly contributed by Tom, the all-transactions page is now complete. Users can filter any key search. 
**TO FIX:** Something to consider is the "Period Covered" filter box. At the moment, it only uses string to filter the results, which is not correct from the user's perspective.
- Might add time and location soon to the all-transactions page.  
## Changelog 2.1: 

All layouts change according to the following viewport widths:
x > 1400px
1200px <= x < 1399.98px
992px <= x < 1199.98px
768px <= x < 991.98px
576px <= x < 767.98px
x < 575.98px

I'm unable to provide screenshots as they take too much time.
## Changelog 2.0: 
+++ Responsive designs:
  ++ Guest Dashboard:
    + Added a button to display sidebar for viewport width < 1200px
      - ![image](https://github.com/user-attachments/assets/135d4687-0b4c-4e6d-b6c5-ebaba6c78f2d)
    + Some layout designs for different widths:
      - ![image](https://github.com/user-attachments/assets/595c5461-c633-498b-82af-8927ae5db955)
      - (Has dashboard sidebar button pressed): 
        ![image](https://github.com/user-attachments/assets/a1a985ae-c3a5-4b3f-abef-a84ff9d4d35d)
  ++ Emitter dashboard (To be implemented):
  ++ Issuer dashboard (To be implemented): 

+ Final design for each dashboard:
  - Guest Dashboard (Finalized): 
    ![image](https://github.com/user-attachments/assets/4d307f0b-c6a1-4076-aebf-a21457be1d45)
  - Emitter Dashboard (Not yet finalized):
    ![image](https://github.com/user-attachments/assets/c3577531-3b45-4c75-8c15-1c2f50b8e049)
  - Issuer Dashboard:
    ![image](https://github.com/user-attachments/assets/80bea0e9-2af3-46f7-b68e-f2fecd2e3942)
  - Verifier Dashboard:
    ![image](https://github.com/user-attachments/assets/a654695b-12f0-4657-a369-a49e56505500)

## Changelog 1.1: 
- Added wireframes for the front-end design for verifiers and the public users.
  ![image](https://github.com/user-attachments/assets/72dc6721-ce10-4940-84ec-e9653be1da62)
  ![image](https://github.com/user-attachments/assets/afba6c7b-c550-4b78-ab5d-e1c150a0387a)

### Changelog 1.0.1: 
- Integrated the add/fetch SQL functions for emitters and issuers to the front-end:
  - For emitters (& console log):
![image](https://github.com/user-attachments/assets/ba46e765-04f1-401d-b7d0-ef10cec98449)
![image](https://github.com/user-attachments/assets/55ce7e2f-90a3-43cb-aea7-5cdeef7c90b3)
  - For issuers (console log): 
![image](https://github.com/user-attachments/assets/882b237f-a31e-4105-bfb8-cf6475d9e989)
![image](https://github.com/user-attachments/assets/c80f4e7a-529d-468a-8559-8194ff46e409)
- Future fixes: to remove the id and make changes between metamask accounts work without having to refresh page;
  (currently, we can only switch from Issuer to Emitter). The main cause for this is the slicing i used to
  shorten the addresses of the account and the transaction hashes. 

## Changelog 1.0: 
- Successfully fetched data from the database and displayed them on the front-end. 
![image](https://github.com/user-attachments/assets/7e01efea-4fe1-49da-9a6b-a221ffb8f9d7)
