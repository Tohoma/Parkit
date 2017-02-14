//
//  ViewController.swift
//  Parkit
//
//  Created by asia media on 2/14/17.
//  Copyright © 2017 Parkit. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    //MARK: Properties
    @IBOutlet var aTitle: UILabel!
    
    

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    //MARK: Actions
    
    @IBAction func signIn(_ sender: UIButton) {
        //aTitle.text = "I've changed!"
        let signInVC = self.storyboard?.instantiateViewController(withIdentifier: "signin") as! SignInController
        self.present(signInVC, animated: true, completion: nil)
    }


}

