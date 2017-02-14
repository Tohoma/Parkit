//
//  Registration.swift
//  Parkit
//
//  Created by asia media on 2/14/17.
//  Copyright © 2017 Parkit. All rights reserved.
//

import UIKit

class Registration: UIViewController, UITextFieldDelegate {
    //MARK: Properties
    
    @IBOutlet var firstName: UITextField!
    @IBOutlet var lastName: UITextField!
    @IBOutlet var email: UITextField!
    @IBOutlet var confirmEmail: UITextField!
    @IBOutlet var password: UITextField!
    @IBOutlet var confirmPassword: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //Do any additional setup after loading the view, typically from a nib.
        // handle the text field's user input through delegate callbacks.
        
        firstName.delegate = self
        lastName.delegate = self
        email.delegate = self
        confirmEmail.delegate = self
        password.delegate = self
        confirmPassword.delegate = self
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated
    }
    
    //MARK: UITextFieldDelegate
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        // Hide the keyboard.
        textField.resignFirstResponder()
        return true
    }
    
}
