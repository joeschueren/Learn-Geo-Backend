var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var _this = this;
var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv").config();
var cors = require("cors");
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
function capitalize(name) {
    var words = name.split(" ");
    for (var i = 0; i < words.length; i++) {
        if (words[i].toLowerCase() !== "the" && words[i].toLowerCase() !== "of" && words[i].toLowerCase() !== "and") {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }
    }
    return words.join(" ");
}
mongoose.connect((_a = process.env.MONGO_URL) === null || _a === void 0 ? void 0 : _a.toString()).then(console.log("successfully connected"));
var countrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    latitude: Number,
    longitude: Number,
    population: Number,
    code: String,
    continent: String
});
var Country = mongoose.model('Country', countrySchema);
var scoreSchema = new mongoose.Schema({
    name: String,
    score: Number
});
var Score = mongoose.model('Score', scoreSchema);
app.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Country.find().select('-_id -__v')];
            case 1:
                countries = _a.sent();
                res.json(countries);
                return [2 /*return*/];
        }
    });
}); });
app.get("/na", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Country.find({ continent: "North America" }).select('-_id -__v')];
            case 1:
                countries = _a.sent();
                res.json(countries);
                return [2 /*return*/];
        }
    });
}); });
app.get("/eu", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Country.find({ continent: "Europe" }).select('-_id -__v')];
            case 1:
                countries = _a.sent();
                res.json(countries);
                return [2 /*return*/];
        }
    });
}); });
app.get("/as", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Country.find({ continent: "Asia" }).select('-_id -__v')];
            case 1:
                countries = _a.sent();
                res.json(countries);
                return [2 /*return*/];
        }
    });
}); });
app.get("/oc", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Country.find({ continent: "Australia" }).select('-_id -__v')];
            case 1:
                countries = _a.sent();
                res.json(countries);
                return [2 /*return*/];
        }
    });
}); });
app.get("/sa", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Country.find({ continent: "South America" }).select('-_id -__v')];
            case 1:
                countries = _a.sent();
                res.json(countries);
                return [2 /*return*/];
        }
    });
}); });
app.get("/af", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Country.find({ continent: "Africa" }).select('-_id -__v')];
            case 1:
                countries = _a.sent();
                res.json(countries);
                return [2 /*return*/];
        }
    });
}); });
app.get("/name/:name", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var name, countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.params.name;
                name = capitalize(name);
                return [4 /*yield*/, Country.find({ name: name }).select('-_id -__v')];
            case 1:
                countries = _a.sent();
                if (countries.length === 0) {
                    res.status(404).json("No capitals were found under the name: " + name);
                }
                else {
                    res.json(countries);
                }
                return [2 /*return*/];
        }
    });
}); });
app.get("/capital/:name", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var name, countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.params.name;
                name = capitalize(name);
                return [4 /*yield*/, Country.find({ capital: name }).select('-_id -__v')];
            case 1:
                countries = _a.sent();
                if (countries.length === 0) {
                    res.status(404).json("No countries were found under the name: " + name);
                }
                else {
                    res.json(countries);
                }
                return [2 /*return*/];
        }
    });
}); });
app.get("/population/:comparison/:amount", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var comparison, amount, countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comparison = req.params.comparison;
                amount = parseInt(req.params.amount);
                comparison = capitalize(comparison);
                countries = [];
                if (!(isNaN(amount) || amount >= 1430000000)) return [3 /*break*/, 1];
                res.status(404).json("invalid value entered for number");
                return [3 /*break*/, 7];
            case 1:
                if (!(comparison === "Greater")) return [3 /*break*/, 3];
                return [4 /*yield*/, Country.find({ population: { $gt: amount } }, { _id: 0, __v: 0 })];
            case 2:
                countries = _a.sent();
                return [3 /*break*/, 6];
            case 3:
                if (!(comparison === "Less")) return [3 /*break*/, 5];
                return [4 /*yield*/, Country.find({ population: { $lt: amount } }, { _id: 0, __v: 0 })];
            case 4:
                countries = _a.sent();
                return [3 /*break*/, 6];
            case 5:
                res.status(404).json("Comparison method not found");
                _a.label = 6;
            case 6:
                res.json(countries);
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
app.get("/random", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Country.aggregate([{ $sample: { size: 1 } }, { $project: { _id: 0, __v: 0 } }])];
            case 1:
                countries = _a.sent();
                res.json(countries);
                return [2 /*return*/];
        }
    });
}); });
app.get("/random/:number", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var number, countries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(isNaN(parseInt(req.params.number)) || parseInt(req.params.number) >= 195)) return [3 /*break*/, 1];
                res.status(404).json("invalid value entered for number");
                return [3 /*break*/, 3];
            case 1:
                number = parseInt(req.params.number);
                return [4 /*yield*/, Country.aggregate([{ $sample: { size: number } }, { $project: { _id: 0, __v: 0 } }])];
            case 2:
                countries = _a.sent();
                res.json(countries);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/low-score", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lowScore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Score.findOne().sort("score")];
                case 1:
                    lowScore = _a.sent();
                    res.json(lowScore);
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/scores", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var scores;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Score.find().sort({ score: -1 }).exec()];
                case 1:
                    scores = _a.sent();
                    res.json(scores);
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/score/submit", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var scoreInfo, newScore, topScoresQuery, topScores, topScoreIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scoreInfo = req.body;
                newScore = new Score({ name: scoreInfo.name, score: scoreInfo.score });
                return [4 /*yield*/, newScore.save().then(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("successfully added");
                        }
                    })];
            case 1:
                _a.sent();
                console.log(newScore);
                topScoresQuery = Score.find().sort({ score: -1 }).limit(5);
                return [4 /*yield*/, topScoresQuery.exec()];
            case 2:
                topScores = _a.sent();
                console.log(topScores);
                topScoreIds = topScores.map(function (score) { return score._id; });
                Score.deleteMany({ _id: { $nin: topScoreIds } }).then(function () {
                    console.log("Data deleted");
                    res.status(200).send(); // Success
                }).catch(function (error) {
                    console.log(error); // Failure
                    res.status(500).send();
                });
                return [2 /*return*/];
        }
    });
}); });
app.listen(5000, function () {
    console.log("server listening on port 5000");
});
