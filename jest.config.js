module.exports = {
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        url: "http://localhost/"
    },
    testMatch: ["<rootDir>/.learn/exercises/**/test.js"],
    testPathIgnorePatterns: ["/08.1-red-borders/"]
};
