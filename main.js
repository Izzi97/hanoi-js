function newGame(size) {
    const state = [
        Array(size).fill(null).map((_, i) => i+1),
        [],
        [],
    ]

    function shiftDisk(from, to) {
        state[to].unshift(state[from].shift())
        return state
    }

    function solveRecursively() {
        function go(n, from, to, aux) {
            if (n<=0) return

            go(n-1, from, aux, to)

            shiftDisk(from, to)
            console.log(state)

            go(n-1, aux, to, from)
        }

        console.log(state)
        go(size, 0, 2, 1)
    }

    function solveIteratively() {
        const todos = [
            { size, from: 0, to: 2, aux: 1 }
        ]

        console.log(state)
        while (todos.length != 0) {
            const { size, from, to, aux } = todos.shift()
            if (size == 1) {
                shiftDisk(from, to)
                console.log(state)
            } else {
                todos.unshift(
                    { size: size-1, from, to: aux, aux: to },
                    { size: 1, from, to, aux },
                    { size: size-1, from: aux, to, aux: from }
                )
            }
        }
    }

    return {
        solveRecursively,
        solveIteratively,
    }
}

