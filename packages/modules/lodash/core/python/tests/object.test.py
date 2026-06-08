"""
object
"""

import unittest
import libs as _


class TestObjectMethods(unittest.TestCase):
    def test_assign(self):
        self.assertEqual(_.assign({"a": 0}, {"a": 1}, {"b": 1}), {"a": 1, "b": 1})

    def test_at(self):
        obj = {"a": {"b": {"c": 3}, "d": 4}}
        self.assertEqual(_.at(obj, ["a.b.c", "a.d"]), [3, 4])

    def test_defaults(self):
        self.assertEqual(_.defaults({"a": 1}, {"b": 2}, {"a": 3}), {"a": 1, "b": 2})

    def test_find_key(self):
        users = {
            "barney": {"age": 36, "active": True},
            "fred": {"age": 40, "active": False},
            "pebbles": {"age": 1, "active": True},
        }
        self.assertEqual(_.find_key(users, lambda u: u["age"] < 40), "barney")
        self.assertEqual(_.find_key(users, lambda u: u["age"] == 1 and u["active"]), "pebbles")
        self.assertEqual(_.find_key(users, lambda u: not u["active"]), "fred")
        self.assertEqual(_.find_key(users, lambda u: u["active"]), "barney")

    def test_for_in(self):
        object = {"a": 1, "b": 2, "c": 3}
        _.for_in(object, lambda value, key: print(key, value))

    def test_for_in_right(self):
        object = {"a": 1, "b": 2, "c": 3}
        _.for_in_right(object, lambda value, key: print(key, value))

    def test_for_own(self):
        object = {"a": 1, "b": 2, "c": 3}
        _.for_own(object, lambda value, key: print(key, value))

    def test_for_own_right(self):
        object = {"a": 1, "b": 2, "c": 3}
        _.for_own_right(object, lambda value, key: print(key, value))

    def test_find_last_key(self):
        users = {
            "barney": {"age": 36, "active": True},
            "fred": {"age": 40, "active": False},
            "pebbles": {"age": 1, "active": True},
        }
        self.assertEqual(_.find_last_key(users, lambda u: u["age"] < 40), "pebbles")
        self.assertEqual(_.find_last_key(users, lambda u: u["age"] == 36 and u["active"]), "barney")
        self.assertEqual(_.find_last_key(users, lambda u: not u["active"]), "fred")
        self.assertEqual(_.find_last_key(users, lambda u: u["active"]), "pebbles")

    def test_functions(self):
        object = {"a": _.constant("a"), "b": _.constant("b")}
        self.assertEqual(_.functions(object), ["a", "b"])

    def test_functions_in(self):
        object = {"a": _.constant("a"), "b": _.constant("b"), "c": _.constant("c")}
        self.assertEqual(_.functions_in(object), ["a", "b", "c"])

    def test_get(self):
        obj = {"a": {"b": 1}}
        self.assertEqual(_.get(obj, "a.b"), 1)
        self.assertEqual(_.get(obj, "a.b.c"), None)

    def test_has(self):
        object = {"a": {"b": 2}}
        self.assertTrue(_.has(object, "a"))
        self.assertTrue(_.has(object, "a.b"))
        self.assertFalse(_.has(object, "c"))

    def test_invert(self):
        self.assertEqual(_.invert({"a": 1, "b": 2, "c": 1}), {"1": "c", "2": "b"})

    def test_invertBy(self):
        self.assertEqual(_.invert_by({"a": 1, "b": 2, "c": 1}), {"1": ["a", "c"], "2": ["b"]})

    def test_keys(self):
        self.assertEqual(_.keys({"a": 1, "b": 2}), ["a", "b"])

    def test_keysIn(self):
        self.assertEqual(_.keys({"a": 1, "b": 2, "c": 3}), ["a", "b", "c"])

    def test_mapKeys(self):
        self.assertEqual(_.map_keys({"a": 1, "b": 2}, lambda value, key: str(key) + str(value)), {"a1": 1, "b2": 2})

    def test_mapValues(self):
        users = {"fred": {"user": "fred", "age": 40}, "pebbles": {"user": "pebbles", "age": 1}}
        _.map_values(users, lambda o: o["age"])
        self.assertEqual(users, {"fred": 40, "pebbles": 1})

    def test_omit(self):
        object = {"a": 1, "b": "2", "c": 3}
        self.assertEqual(_.omit(object, ["a", "c"]), {"b": "2"})

    def test_omitBy(self):
        object = {"a": 1, "b": "2", "c": 3}
        self.assertEqual(_.omit_by(object, _.is_number), {"b": "2"})

    def test_pick(self):
        obj = {"a": 1, "b": "2", "c": 3}
        self.assertEqual(_.pick(obj, ["a", "c"]), {"a": 1, "c": 3})

    def test_pickBy(self):
        object = {"a": 1, "b": "2", "c": 3}
        self.assertEqual(_.pick_by(object, _.is_number), {"a": 1, "c": 3})

    def test_result(self):
        obj = {"a": {"b": {"c1": 3, "c2": _.constant(4)}}}
        self.assertEqual(_.result(obj, "a.b.c1"), 3)
        self.assertEqual(_.result(obj, "a.b.c2"), 4)

    def test_setObject(self):
        obj = {"a": {"b": {"c": 0}}}
        self.assertEqual(_.set_object(obj, "a.b.c", 1), {"a": {"b": {"c": 1}}})

    def test_toPairs(self):
        obj = {"a": 1, "b": 2}
        self.assertEqual(_.to_pairs(obj), [["a", 1], ["b", 2]])

    def test_toPairsIn(self):
        obj = {"a": 1, "b": 2, "c": 3}
        self.assertEqual(_.to_pairs_in(obj), [["a", 1], ["b", 2], ["c", 3]])

    def test_update(self):
        obj = {"a": {"b": {"c": 3}}}
        _.update(obj, "a.b.c", lambda n: n * n)
        self.assertEqual(obj, {"a": {"b": {"c": 9}}})

    def test_values(self):
        obj = {"a": 1, "b": 2}
        self.assertEqual(_.values(obj), [1, 2])

    def test_valuesIn(self):
        obj = {"a": 1, "b": 2, "c": 3}
        self.assertEqual(_.values_in(obj), [1, 2, 3])


    def test_assign_in(self):
        obj = {"a": 1}
        _.assign_in(obj, {"b": 2}, {"c": 3})
        self.assertEqual(obj, {"a": 1, "b": 2, "c": 3})

    def test_assign_with(self):
        obj = {"a": 1}
        _.assign_with(obj, {"a": 2, "b": 3}, customizer=lambda o, n, k, *_: o + n if k == "a" else None)
        self.assertEqual(obj, {"a": 3, "b": 3})

    def test_assign_in_with(self):
        obj = {"a": 1}
        _.assign_in_with(obj, {"a": 2}, customizer=lambda o, n, *_: o + n)
        self.assertEqual(obj, {"a": 3})

    def test_create(self):
        prototype = {"a": 1}
        obj = _.create(prototype, {"b": 2})
        self.assertEqual(obj, {"a": 1, "b": 2})

    def test_defaults_deep(self):
        result = _.defaults_deep({"a": {"b": 2}}, {"a": {"b": 1, "c": 3}})
        self.assertEqual(result, {"a": {"b": 2, "c": 3}})

    def test_has_in(self):
        obj = {"a": {"b": 2}}
        self.assertTrue(_.has_in(obj, "a"))
        self.assertTrue(_.has_in(obj, "a.b"))
        self.assertFalse(_.has_in(obj, "c"))

    def test_invoke(self):
        obj = {"a": {"b": [1, 2, 3]}}
        result = _.invoke(obj, "a.b.pop")
        self.assertEqual(result, 3)
        self.assertEqual(obj, {"a": {"b": [1, 2]}})

    def test_invoke_with_args(self):
        obj = {"a": "hello world"}
        result = _.invoke(obj, "a.split", " ")
        self.assertEqual(result, ["hello", "world"])

    def test_merge(self):
        obj = {"a": {"b": 1}, "c": 2}
        _.merge(obj, {"a": {"d": 3}, "e": 4})
        self.assertEqual(obj, {"a": {"b": 1, "d": 3}, "c": 2, "e": 4})

    def test_merge_with(self):
        obj = {"a": 1, "b": 2}
        _.merge_with(obj, {"a": 3, "b": 4, "c": 5}, customizer=lambda o, n, *_: n if o is None else o + n)
        self.assertEqual(obj, {"a": 4, "b": 6, "c": 5})

    def test_set_with(self):
        obj = {"a": {"b": 1}}
        _.set_with(obj, "a.b", 2, customizer=lambda o, n, *_: o + n)
        self.assertEqual(obj, {"a": {"b": 3}})

    def test_transform(self):
        obj = {"a": 1, "b": 2, "c": 1}
        result = _.transform(obj, lambda acc, val, key: acc.update({val: acc.get(val, []) + [key]}) or acc, {})
        self.assertEqual(result, {1: ["a", "c"], 2: ["b"]})

    def test_unset(self):
        obj = {"a": {"b": 1, "c": 2}}
        self.assertTrue(_.unset(obj, "a.b"))
        self.assertEqual(obj, {"a": {"c": 2}})
        self.assertFalse(_.unset(obj, "x"))

    def test_update_with(self):
        obj = {"a": {"b": 1}}
        _.update_with(obj, "a.b", lambda n: n * 2, customizer=lambda o, n, *_: o + n)
        self.assertEqual(obj, {"a": {"b": 3}})


if __name__ == "__main__":
    unittest.main()
