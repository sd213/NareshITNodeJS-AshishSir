# How Redis works

## Redis (Remote Dictionary Server) is an in-memory data structure store that can be used as a database, cache, and message broker. It is known for its speed, flexibility, and support for various data structures such as strings, lists, sets, hashes, bitmaps, and more. Here's an overview of how Redis works

### **1. In-Memory Storage**

- **Data Storage**: Redis stores all data in memory, which allows it to access and manipulate data extremely quickly compared to disk-based databases. This makes Redis particularly useful for applications requiring low latency, such as caching and real-time analytics.
  
- **Persistence**: Although Redis operates in-memory, it can persist data to disk using two main methods:
  - **Snapshotting (RDB - Redis Database File)**: Redis can take snapshots of the dataset at specified intervals and save them to disk.
  - **Append-Only File (AOF)**: Redis can log every write operation received by the server to an append-only file, allowing you to replay these operations to restore the dataset.

### **2. Data Structures**

Redis supports a variety of data structures, each optimized for different types of operations:

- **Strings**: The simplest type in Redis, used for storing text or binary data. You can perform operations like `GET`, `SET`, `INCR`, `DECR`, etc.
  
- **Lists**: Ordered collections of strings, which can be manipulated with operations like `LPUSH` (add to the front), `RPUSH` (add to the back), `LPOP`, and `RPOP`.

- **Sets**: Unordered collections of unique strings. Redis supports operations like `SADD` (add to set), `SREM` (remove from set), and set operations like `SINTER` (intersection), `SUNION` (union).

- **Hashes**: A collection of key-value pairs, similar to a JSON object or a Python dictionary. Useful for storing objects where you need to retrieve or modify individual fields.

- **Sorted Sets**: Similar to sets but with an associated score (a floating-point number), allowing you to retrieve elements ordered by their score.

- **Bitmaps and HyperLogLogs**: Specialized data structures for specific use cases, like tracking binary states and estimating the cardinality of large datasets.

### **3. Caching**

Redis is often used as a caching layer in front of a traditional database. It stores frequently accessed data in memory, reducing the load on the database and speeding up data retrieval.

- **TTL (Time to Live)**: Redis allows you to set an expiration time on keys, making it easy to implement cache invalidation policies.
  
- **LRU (Least Recently Used)**: Redis supports various eviction policies, including LRU, which can be used to remove old or infrequently accessed data when memory is full.

### **4. Pub/Sub Messaging**

Redis supports the Publish/Subscribe messaging paradigm, where messages are sent to channels. Clients can subscribe to one or more channels and receive messages sent to those channels. This feature is useful for real-time communication between different parts of an application.

### **5. Replication and Clustering**

- **Replication**: Redis supports master-slave replication, where data from a master server is copied to one or more replica servers. This is useful for achieving high availability and load balancing read operations.
  
- **Clustering**: Redis can be scaled horizontally using sharding, where data is distributed across multiple nodes in a Redis cluster. Each node holds a portion of the data and handles requests for that portion.

### **6. Transactions**

Redis supports transactions through the `MULTI`, `EXEC`, `DISCARD`, and `WATCH` commands. Transactions in Redis are all-or-nothing operations, ensuring that either all commands in a transaction are executed or none are.

### **7. Use Cases**

Redis is versatile and used in various scenarios:

- **Caching**: Speed up applications by storing frequently accessed data in memory.
- **Session Management**: Store user sessions in Redis, allowing fast retrieval and updates.
- **Real-Time Analytics**: Track real-time metrics, counters, and more.
- **Messaging Queue**: Use Redis lists or Pub/Sub for building message queues.
- **Leaderboard**: Store and retrieve leaderboards using sorted sets.

### **Example: Basic Redis Operations**

Assuming you have Redis installed and running:

**Setting and Getting a Key-Value Pair:**

```bash
$ redis-cli
127.0.0.1:6379> SET mykey "Hello, Redis!"
OK
127.0.0.1:6379> GET mykey
"Hello, Redis!"
```

**Working with Lists:**

```bash
127.0.0.1:6379> LPUSH mylist "first"
(integer) 1
127.0.0.1:6379> LPUSH mylist "second"
(integer) 2
127.0.0.1:6379> LRANGE mylist 0 -1
1) "second"
2) "first"
```

**Using Pub/Sub:**

```bash
# In one terminal, subscribe to a channel
127.0.0.1:6379> SUBSCRIBE mychannel

# In another terminal, publish a message to the channel
127.0.0.1:6379> PUBLISH mychannel "Hello, Subscribers!"
```

### **Summary**

Redis works as an in-memory data store that is extremely fast and versatile. It supports multiple data structures, can persist data, and is commonly used for caching, real-time analytics, and message brokering. With support for replication, clustering, and transactions, Redis is suitable for building high-performance, scalable applications.
