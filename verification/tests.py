"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [[200, 150], [[100, 75, 130]]],
            "answer": True
        },
        {
            "input": [[200, 150], [[50, 75, 100], [150, 75, 100]]],
            "answer": True
        },
        {
            "input": [[200, 150], [[50, 75, 100], [150, 25, 50], [150, 125, 50]]],
            "answer": False,
        },
        {
            "input": [[200, 150], [[100, 75, 100], [0, 40, 60], [0, 110, 60], [200, 40, 60], [200, 110, 60]]],
            "answer": True
        },
        {
            "input": [[200, 150], [[100, 75, 100], [0, 40, 50], [0, 110, 50], [200, 40, 50], [200, 110, 50]]],
            "answer": False
        },
        {
            "input": [[200, 150], [[100, 75, 110], [105, 75, 110]]],
            "answer": False
        },
        {
            "input": [[200, 150], [[100, 75, 110], [105, 75, 20]]],
            "answer": False
        },
        {
            "input": [[3, 1], [[1, 0, 2], [2, 1, 2]]],
            "answer": True
        },
        {
            "input": [[30, 10], [[0, 10, 10], [10, 0, 10], [20, 10, 10], [30, 0, 10]]],
            "answer": True
        },
        {
            "input": [[30, 10], [[0, 10, 8], [10, 0, 7], [20, 10, 9], [30, 0, 10]]],
            "answer": False
        }
    ]
}
