import {exit} from "node:process";
import {readFileSync, writeFileSync, existsSync} from "node:fs";
export class DataSource {
    data = [];
    constructor(fileName) {
        this.fileName = fileName;
        if(existsSync(this.fileName)){
            this._load();
        } else {
            this._save();
        }
    }

    getAll() {
        return this.data;
    }

    getOne(id) {
        const found = this.data.find(itm =>{
            return +itm.id === +id;
        });
        if(found) {
            return found;
        }
        return false;
    }

    add(user) {

        let id= 1;
        if(this.data.length){
            const objectWithMaxId = this.data.reduce((maxObj, currentObj) => {
                return (currentObj.id > maxObj.id) ? currentObj : maxObj;
            });
            id = objectWithMaxId.id + 1;
        }

        const newUser = {...user, id};
        this.data.push(newUser);
        this._save();
        return newUser;
    }

    edit(user, id) {
        let updatedUser;
        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            if(element.id === id) {
                this.data[index] = user;
                updatedUser = this.data[index];
                this._save();
                return updatedUser;
            }
        }
        return false;
    }

    delete(id) {
        this.data = this.data.filter(itm=>{
            return +itm.id !== +id;
        });
        this._save();
        return true;
    }

    _load(){
        try {
            this.data = JSON.parse(readFileSync(this.fileName));
        } catch(e) {
            console.error(e);
            exit(-1);
        }
    }

    _save(){
        try {
            writeFileSync(this.fileName, JSON.stringify(this.data));
        } catch(e) {
            console.error(e);
            exit(-1);
        }
    }
}