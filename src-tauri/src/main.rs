#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, CustomMenuItem};

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
  let system_tray_menu = SystemTrayMenu::new().add_item(quit);

  tauri::Builder::default()
    .plugin(tauri_plugin_sqlite::init())
    .invoke_handler(tauri::generate_handler![close_splashscreen])
    .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                // toggle application window
                if window.is_visible().unwrap() {
                    window.hide().unwrap();
                } else {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            },
            SystemTrayEvent::MenuItemClick { id, .. } => {
              match id.as_str() {
                "quit" => {
                  std::process::exit(0);
                }
                _ => {}
              }
            }
            _ => {}
        })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
