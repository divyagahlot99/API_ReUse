export const teamsList = [
  "Billing","Checkout","Mobile","Accounting","Fraud","Web","Admin","Partner",
  "Warehouse","Analytics","Search","Recommendations","Returns","Support","Integration","Ops"
];

export const meaningfulApiNames = [
  "payments","payments-v2","billing","invoicing","checkout","orders","order-routing",
  "inventory","inventory-sync","shipping","tracking","courier-gateway","auth","identity",
  "session","profile","user-preferences","subscriptions","pricing","discounts","promotions",
  "tax-service","fraud-detection","risk-scoring","notifications","email-service","sms-service",
  "webhooks","analytics","events","reporting","search","recommendations","catalog","catalog-v2",
  "media-service","thumbnail","content","cms-sync","returns","refunds","reconciliation",
  "accounting","ledger","payments-reconcile","integrations-gateway","partner-api","admin-console",
  "support","ops-monitoring","metrics","logging","feature-flag","scheduler","batch-jobs",
  "supplier","procurement","address-service","geolocation","delivery-optimizer","mobile-sdk","web-frontend"
];

// generate mockData once
const rnd = (n) => Math.floor(Math.random() * n);
export const mockData = meaningfulApiNames.map((name) => {
  const pickCount = 1 + rnd(6);
  const picked = new Set();
  while (picked.size < pickCount) picked.add(teamsList[rnd(teamsList.length)]);
  return { api: name, teams: Array.from(picked) };
});

// named exports are fine; also export a named default variable to satisfy the lint rule
const mockApi = { teamsList, meaningfulApiNames, mockData };
export default mockApi;