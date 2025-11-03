import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  swagger: null,
  reuseScore: 78,
  topMatches: [
    { id: 'pmt', name: 'Payments API', team: 'Team Payments', score: 86, description: 'Feam Payments', endpoints: ['/payments', '/payments/{id}'] },
    { id: 'txn', name: 'Transaction Initiation API', team: 'Team Cards', score: 73, description: 'Team Cards', endpoints: ['/transactions', '/transactions/init'] },
    { id: 'cust', name: 'Customer Lookup API', team: 'Team Customers', score: 68, description: 'Team Customers', endpoints: ['/customers', '/customers/{id}'] },
  ],
  drawer: { open: false, data: null },
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setSwagger(state, action) {
      state.swagger = action.payload;
    },
    computeFromSwagger(state, action) {
      // Simulate some analysis on swagger JSON
      const swagger = action.payload;
      // crude heuristics for fake score: based on number of paths
      const paths = swagger.paths ? Object.keys(swagger.paths).length : 0;
      const base = Math.min(90, 40 + paths * 3);
      state.reuseScore = Math.max(10, Math.round(base));

      // generate topMatches based on some heuristic
      const possible = [
        { id: 'pmt', name: 'Payments API', team: 'Team Payments', description: 'Feam Payments', endpoints: ['/payments'] },
        { id: 'txn', name: 'Transaction Initiation API', team: 'Team Cards', description: 'Team Cards', endpoints: ['/transactions'] },
        { id: 'cust', name: 'Customer Lookup API', team: 'Team Customers', description: 'Team Customers', endpoints: ['/customers'] },
        { id: 'auth', name: 'Auth API', team: 'Team Auth', description: 'Authentication and tokens', endpoints: ['/auth'] },
      ];

      // score them by checking if swagger paths contain some keyword
      const top = possible.map((p) => {
        let score = Math.random() * 30 + base / 1.2;
        const keywords = p.endpoints.map((e) => e.replace('/', ''));
        for (const k of keywords) {
          for (const path of Object.keys(swagger.paths || {})) {
            if (path.toLowerCase().includes(k)) score += 6;
          }
        }
        return { ...p, score: Math.min(99, score) };
      });

      // sort and pick top 3
      top.sort((a, b) => b.score - a.score);
      state.topMatches = top.slice(0, 3);
    },
    openDrawer(state, action) {
      state.drawer.open = true;
      state.drawer.data = action.payload;
    },
    closeDrawer(state) {
      state.drawer.open = false;
      state.drawer.data = null;
    },
  },
});

export const { setSwagger, computeFromSwagger, openDrawer, closeDrawer } = apiSlice.actions;
export default apiSlice.reducer;