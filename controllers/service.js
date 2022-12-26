const service = require('../models/service');

// create new service
function createService(req, res) {
    const { name, price, description, service_type } = req.body;
    const newService = new service({
        name,
        price,
        description,
        service_type
    });
    try {
        newService.save((data, err) => {
            if (err) {
                res.status(500).json({ message: "Service created failed" });
            } else {
                res.status(200).json({ message: "Service created successfully" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Service created failed" });
    }
}

// get all service
async function getAllService(req, res) {
    const { type } = req.query;
    let services;
    try {
        if (!type) {
            services = await service.find();
        }else{
            services = await service.find({ service_type: type });
        }
        res.status(200).json({ message: "Get all service successfully", data: services, count: services.length });
    } catch (error) {
        res.status(500).json({ message: "Get all service failed" });
    }
}

// get service by id
async function getServiceById(req, res) {
    const { id } = req.params;
    try {
        const services = await service.findById(id);
        res.status(200).json({ message: "Get service by id successfully", data: services });
    } catch (error) {
        res.status(500).json({ message: "Get service by id failed" });
    }
}

// update service
async function updateService(req, res) {
    let { id, name, price, description, service_type } = req.body;
    try {
        const old_service = await service.findById(id);
        if (name == null) {
            name = old_service.name;
        }
        if (price == null) {
            price = old_service.price;
        }
        if (description == null) {
            description = old_service.description;
        }
        if (service_type == null) {
            service_type = old_service.service_type;
        }
        console.log(id, name, price, description, service_type);
        service.findByIdAndUpdate (id, { name, price, description, service_type }, (data, err) => {
            if (err) {
                res.status(500).json({ message: "Update service failed" });
            } else {
                res.status(200).json({ message: "Update service successfully" });
            }
        });
    } catch (error) {
        // console.log(id, name, price, description, service_type);
        console.log(error);
        res.status(500).json({ message: "Update service failed" });
    }
}

// delete service
async function deleteService(req, res) {
    const { id } = req.body;
    try {
        service.findByIdAndDelete(id, (data, err) => {
            if (err) {
                res.status(500).json({ message: "Delete service failed" });
            } else {
                res.status(200).json({ message: "Delete service successfully" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Delete service failed" });
    }
}

module.exports = {
    createService,
    getAllService,
    getServiceById,
    updateService,
    deleteService
};
