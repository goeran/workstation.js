#include "Screen.h"

#include <QLineEdit>
#include <QLabel>
#include <QVBoxLayout>
#include <QPushButton>

Screen::Screen(QWidget* parent, const QString& title) 
  : QWidget(parent)
{
  QVBoxLayout* layout = new QVBoxLayout;
  setLayout(layout);
}

void Screen::addLabel(const QString& title) 
{
  layout()->addWidget(new QLabel(title, this));
}

void Screen::addTextEdit(const QString& defaultText) 
{
  layout()->addWidget(new QLineEdit(defaultText, this));
}

void Screen::addButton(const QString& buttonText)
{
  layout()->addWidget(new QPushButton(buttonText, this));
}
