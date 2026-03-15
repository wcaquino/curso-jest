module.exports = {
    testEnvironment: 'node',
    verbose: true,
    clearMocks: true,
    restoreMocks: true,
    coverageThreshold: {
        global: {
            lines: 90
        }
    },
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/pedidos/pedidos.js'
    ],
    reporters: [
        "default",
        ["jest-junit", {outputDirectory: "reports", outputName: "junit.xml"}]
    ]
}