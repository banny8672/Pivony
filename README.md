# Sunburst Chart in React Using Chart.js

This project implements an interactive sunburst chart in React using Chart.js, mirroring core features offered by Plotly's sunburst visualization.

## Features

1. **Hierarchical Data Visualization**
   - Displays data in concentric rings
   - Each segment's angular span corresponds to its numerical value

2. **Interactive Hover Behavior (Tooltips)**
   - Shows segment label and value on hover
   - Displays percentage relative to the entire dataset

3. **Interactive Click Behavior**
   - Clicking a segment triggers a callback
   - Selected node information is displayed

4. **Filter by Keyword**
   - Supports filtering based on a user-supplied keyword
   - Preserves parent nodes of matching descendants for context

5. **Modularity and Extensibility**
   - Data processing is separate from rendering logic
   - Tooltip formatting and click handlers are configurable

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

## Data Structure

The chart uses hierarchical data in the following format:

```javascript
{
  "name": "Root Node",
  "children": [
    {
      "name": "Category A",
      "children": [
        { "name": "Item 1", "value": 100 },
        { "name": "Item 2", "value": 50 }
      ]
    },
    { "name": "Category B", "value": 75 }
  ]
}
```

## Implementation Details

- Uses Chart.js with the chartjs-chart-graph plugin for sunburst visualization
- Implements custom data processing utilities for hierarchy flattening and filtering
- Provides interactive features like tooltips and click callbacks