/**
 * Flattens hierarchical data into a format suitable for Chart.js sunburst chart
 * @param {Object} node - The hierarchical node to process
 * @param {String} parentId - The ID of the parent node
 * @returns {Array} - Flattened array of nodes with parent references
 */
export const flattenHierarchy = (node, parentId = '') => {
  const id = parentId ? `${parentId}-${node.name}` : node.name;
  const result = [];
  
  // Add current node
  result.push({
    id,
    name: node.name,
    parent: parentId || '',
    value: node.value || 0
  });
  
  // Process children if they exist
  if (node.children && node.children.length > 0) {
    // If node doesn't have a value, calculate it from children
    let childrenSum = 0;
    
    node.children.forEach(child => {
      const childNodes = flattenHierarchy(child, id);
      result.push(...childNodes);
      
      // Sum up leaf values for parent value calculation
      const childValue = child.value || 
        childNodes.filter(n => n.parent === id).reduce((sum, n) => sum + n.value, 0);
      childrenSum += childValue;
    });
    
    // Update the value of the current node if it doesn't have one
    if (!node.value) {
      result[0].value = childrenSum;
    }
  }
  
  return result;
};

/**
 * Filters the hierarchical data based on a keyword
 * @param {Array} flattenedData - The flattened hierarchical data
 * @param {String} keyword - The keyword to filter by
 * @returns {Array} - Filtered flattened data
 */
export const filterByKeyword = (flattenedData, keyword) => {
  if (!keyword) return flattenedData;
  
  const lowercaseKeyword = keyword.toLowerCase();
  
  // Find nodes that match the keyword
  const matchingNodes = flattenedData.filter(node => 
    node.name.toLowerCase().includes(lowercaseKeyword)
  );
  
  // Get all ancestor nodes to preserve hierarchy
  const matchingNodeIds = new Set(matchingNodes.map(node => node.id));
  const requiredNodes = new Set();
  
  // Add all ancestors
  matchingNodes.forEach(node => {
    let currentId = node.id;
    while (currentId) {
      requiredNodes.add(currentId);
      const parentNode = flattenedData.find(n => n.id === currentId);
      currentId = parentNode ? parentNode.parent : '';
    }
  });
  
  // Add all descendants of matching nodes
  flattenedData.forEach(node => {
    if (matchingNodeIds.has(node.parent)) {
      requiredNodes.add(node.id);
    }
  });
  
  return flattenedData.filter(node => requiredNodes.has(node.id));
};