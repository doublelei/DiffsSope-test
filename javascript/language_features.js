/**
 * JavaScript test file for language-specific features.
 * 
 * This file contains examples of JavaScript-specific language features
 * like classes, async/await, proxies, generators, and other modern
 * JavaScript features to test DiffScope's ability to detect changes
 * in these language constructs.
 */

// ----- Classes with Private Fields and Methods -----

class Counter {
  // Private field (with #)
  #count = 0;
  
  // Public field
  name;
  
  constructor(name = "Default Counter") {
    this.name = name;
  }
  
  // Public method
  increment() {
    this.#count++;
    return this.#count;
  }
  
  // Private method
  #validateCount() {
    if (this.#count < 0) {
      throw new Error("Count cannot be negative");
    }
    return true;
  }
  
  // Public method that uses private method
  decrement() {
    this.#count--;
    this.#validateCount();
    return this.#count;
  }
  
  // Getter
  get value() {
    return this.#count;
  }
  
  // Setter
  set value(newValue) {
    if (typeof newValue !== 'number') {
      throw new TypeError("Value must be a number");
    }
    this.#count = newValue;
  }
  
  // Static method
  static createAndIncrement(name) {
    const counter = new Counter(name);
    counter.increment();
    return counter;
  }
}

// ----- Async/Await -----

async function fetchData(url) {
  /**
   * Fetch data from URL asynchronously.
   * @param {string} url - URL to fetch from
   * @returns {Promise<Object>} Fetched data
   */
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
    throw error;
  }
}

async function processUserData(userId) {
  /**
   * Process user data asynchronously.
   * @param {string} userId - User ID to process
   * @returns {Promise<Object>} Processed user data
   */
  try {
    const userData = await fetchData(`/api/users/${userId}`);
    const userPosts = await fetchData(`/api/users/${userId}/posts`);
    
    return {
      user: userData,
      posts: userPosts,
      postCount: userPosts.length,
      lastActive: new Date()
    };
  } catch (error) {
    console.error(`Error processing user ${userId}: ${error.message}`);
    return { error: error.message };
  }
}

// ----- Generators -----

function* fibonacciGenerator(n) {
  /**
   * Generate first n Fibonacci numbers.
   * @param {number} n - Number of Fibonacci numbers to generate
   * @yields {number} Next Fibonacci number
   */
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* infiniteCounter(start = 0, step = 1) {
  /**
   * Generate an infinite sequence of numbers.
   * @param {number} [start=0] - Starting value
   * @param {number} [step=1] - Step size
   * @yields {number} Next number in the sequence
   */
  let value = start;
  while (true) {
    yield value;
    value += step;
  }
}

function* rangeGenerator(start, end, step = 1) {
  /**
   * Generate a range of numbers.
   * @param {number} start - Start value (inclusive)
   * @param {number} end - End value (exclusive)
   * @param {number} [step=1] - Step size
   * @yields {number} Next number in the range
   */
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

// ----- Proxies -----

function createLoggingProxy(target) {
  /**
   * Create a proxy that logs property access.
   * @param {Object} target - Target object to proxy
   * @returns {Proxy} Proxy that logs property access
   */
  return new Proxy(target, {
    get(target, property, receiver) {
      console.log(`Getting property "${property}"`);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      console.log(`Setting property "${property}" to ${value}`);
      return Reflect.set(target, property, value, receiver);
    },
    apply(target, thisArg, args) {
      console.log(`Calling function with args: ${args}`);
      return Reflect.apply(target, thisArg, args);
    }
  });
}

function createValidatingProxy(target, schema) {
  /**
   * Create a proxy that validates property values according to a schema.
   * @param {Object} target - Target object to proxy
   * @param {Object} schema - Validation schema
   * @returns {Proxy} Proxy that validates property values
   */
  return new Proxy(target, {
    set(target, property, value, receiver) {
      if (schema[property]) {
        if (typeof schema[property] === 'function') {
          // Schema property is a validation function
          if (!schema[property](value)) {
            throw new TypeError(`Invalid value for ${property}`);
          }
        } else if (schema[property] === 'number' && typeof value !== 'number') {
          throw new TypeError(`${property} must be a number`);
        } else if (schema[property] === 'string' && typeof value !== 'string') {
          throw new TypeError(`${property} must be a string`);
        }
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}

// ----- Optional Chaining and Nullish Coalescing -----

function getNestedProperty(obj, defaultValue = null) {
  /**
   * Get a nested property with optional chaining.
   * @param {Object} obj - Object to get property from
   * @param {*} [defaultValue=null] - Default value if property doesn't exist
   * @returns {*} Property value or default value
   */
  return obj?.user?.profile?.settings?.theme ?? defaultValue;
}

function formatUsername(user) {
  /**
   * Format a username with nullish coalescing.
   * @param {Object} user - User object
   * @returns {string} Formatted username
   */
  const username = user?.username ?? "anonymous";
  const displayName = user?.profile?.displayName ?? username;
  return displayName;
}

// ----- Destructuring and Rest/Spread -----

function processConfig(config) {
  /**
   * Process configuration with destructuring and defaults.
   * @param {Object} config - Configuration object
   * @returns {Object} Processed configuration
   */
  const {
    host = 'localhost',
    port = 3000,
    secure = false,
    timeout = 5000,
    retries = 3,
    ...otherOptions
  } = config;
  
  return {
    serverUrl: `${secure ? 'https' : 'http'}://${host}:${port}`,
    connectionOptions: {
      timeout,
      retries,
      ...otherOptions
    }
  };
}

function mergeObjects(...objects) {
  /**
   * Merge objects with spread operator.
   * @param {...Object} objects - Objects to merge
   * @returns {Object} Merged object
   */
  return {
    ...objects.reduce((result, obj) => ({ ...result, ...obj }), {})
  };
}

// ----- Tagged Template Literals -----

function html(strings, ...values) {
  /**
   * HTML tagged template literal.
   * @param {string[]} strings - String parts
   * @param {...*} values - Interpolated values
   * @returns {string} HTML string
   */
  return strings.reduce((result, string, i) => {
    const value = values[i] || '';
    // Escape HTML special characters
    const escapedValue = String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return result + string + escapedValue;
  }, '');
}

function sql(strings, ...values) {
  /**
   * SQL tagged template literal.
   * @param {string[]} strings - String parts
   * @param {...*} values - Interpolated values
   * @returns {Object} SQL query object
   */
  const text = strings.reduce((result, string, i) => {
    return result + string + (i < values.length ? `$${i + 1}` : '');
  }, '');
  
  return {
    text,
    values,
    execute() {
      console.log(`Executing SQL: ${text}`);
      console.log(`with values: ${values}`);
      return { rows: [] }; // Mock result
    }
  };
}

// ----- Test cases -----

if (require.main === module) {
  // Test Counter class
  const counter = new Counter("Test Counter");
  console.assert(counter.name === "Test Counter", "Counter name test");
  console.assert(counter.value === 0, "Counter initial value");
  counter.increment();
  counter.increment();
  console.assert(counter.value === 2, "Counter after increment");
  counter.value = 10;
  console.assert(counter.value === 10, "Counter after set value");
  
  // Test generators
  const fibonacci = fibonacciGenerator(5);
  const fibonacciValues = [];
  for (const num of fibonacci) {
    fibonacciValues.push(num);
  }
  console.assert(JSON.stringify(fibonacciValues) === JSON.stringify([0, 1, 1, 2, 3]), "Fibonacci test");
  
  // Test proxy
  const user = { name: "Alice", age: 30 };
  const loggingUser = createLoggingProxy(user);
  // Accessing a property (will log)
  console.assert(loggingUser.name === "Alice", "Proxy get test");
  
  // Test validating proxy
  const userSchema = {
    name: 'string',
    age: (value) => typeof value === 'number' && value >= 0
  };
  const validatingUser = createValidatingProxy({}, userSchema);
  validatingUser.name = "Bob"; // Valid
  validatingUser.age = 25; // Valid
  try {
    validatingUser.age = -5; // Invalid
    console.assert(false, "Validation should have failed");
  } catch (error) {
    console.assert(error instanceof TypeError, "Validation error test");
  }
  
  // Test optional chaining and nullish coalescing
  const deepObject = { user: { profile: { settings: { theme: 'dark' } } } };
  console.assert(getNestedProperty(deepObject) === 'dark', "Optional chaining test");
  console.assert(getNestedProperty({}) === null, "Optional chaining with nullish test");
  
  // Test destructuring and rest/spread
  const config = { host: 'example.com', secure: true, customOption: 'value' };
  const processedConfig = processConfig(config);
  console.assert(processedConfig.serverUrl === 'https://example.com:3000', "Destructuring test");
  
  // Test tagged template literals
  const userName = "John <script>alert('XSS')</script>";
  const htmlResult = html`<div>Hello, ${userName}!</div>`;
  console.assert(
    htmlResult.includes('&lt;script&gt;'),
    "HTML escaping test"
  );
  
  const sqlQuery = sql`SELECT * FROM users WHERE name = ${userName} AND active = ${true}`;
  console.assert(sqlQuery.text === 'SELECT * FROM users WHERE name = $1 AND active = $2', "SQL template test");
  
  console.log("All tests passed!");
}

module.exports = {
  Counter,
  fetchData,
  processUserData,
  fibonacciGenerator,
  infiniteCounter,
  rangeGenerator,
  createLoggingProxy,
  createValidatingProxy,
  getNestedProperty,
  formatUsername,
  processConfig,
  mergeObjects,
  html,
  sql
};
