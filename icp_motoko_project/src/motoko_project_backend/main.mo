import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor {
    public type Product = {
        id: Nat;
        name: Text;
        price: Nat;
    };

    private var nextId : Nat = 0;
    private let products = HashMap.HashMap<Nat, Product>(0, Nat.equal, Hash.hash);

    public func addProduct(name: Text, price: Nat) : async Nat {
        let id = nextId;
        products.put(id, {
            id = id;
            name = name;
            price = price;
        });
        nextId += 1;
        id
    };

    public query func getProduct(id: Nat) : async ?Product {
        products.get(id)
    };

    public query func getAllProducts() : async [Product] {
        Iter.toArray(products.vals())
    };
}